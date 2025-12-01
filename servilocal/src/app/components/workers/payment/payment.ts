import { Component, Renderer2 } from '@angular/core';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { environment } from '../../../../environments/environment';
import { workerService } from '../../../services/worker.service';


declare global {
  interface Window{
    MercadoPago:any;
    paymentBrickController: any;
    MP_DEVICE_SESSION_ID: any;
  }
}

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {
  public mp!: { bricks: () => any; };
  isWallet = false;
  public deviceSessionId = '';

  constructor(
    private _storeService: workerService,
     private renderer: Renderer2
){
  this.getpreference
}

ngOnInit(){
  this.loadSecurityScript();
  this.initmp();
  this.getpreference();
}

  async initmp() {
  await loadMercadoPago();
  this.mp = new window.MercadoPago(
    environment.mercadopagoPK, 
    {
      locale: "en-MX",
    });  
  }

  getpreference(){

     this._storeService.getPreference( ).subscribe({
      next: (response) => {
        if( response.status === 'success' ){

          console.log( response )
          // this.initPreference( response.data.id )
          this.initWallet( response.data.id )

        }else{

          console.log("Ocurrio un Problema");
          console.log(response.mensaje);

        }

      },
      error: ( e ) => {
        let msg = ( e.error )
          ? e.error.message
          : e.message;
        console.log("Ocurrio un Error:" + msg);
      }
    });

  }

  loadSecurityScript() {
    const script = this.renderer.createElement('script');
    script.src = "https://www.mercadopago.com/v2/security.js";
    script.setAttribute('view', 'checkout');
    this.renderer.appendChild(document.body, script);
  }

initPreference( idPreference: any ){
    const bricksBuilder = this.mp.bricks();

    bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
          preferenceId: idPreference,
          redirectMode: 'blank',
      },
      customization: {
        theme: 'dark',
        texts: {
          action: 'pay',
          valueProp: 'smart_option',
        },
      },
    });

  }

  initWallet( idPreference: any ){

    const bricksBuilder = this.mp.bricks();
    this.isWallet = true

    const renderPaymentBrick = async (bricksBuilder: { create: (arg0: string, arg1: string, arg2: { initialization: { amount: number; preferenceId: any; }; customization: { visual: { hidePaymentButton: boolean; hideFormTitle: boolean; texts: { formSubmit: string; paymentMethods: { newCreditCardTitle: string; newDebitCardTitle: string; debitCardTitle: string; creditCardTitle: string; }; }; }; paymentMethods: { mercadoPago: string; creditCard: string; debitCard: string; maxInstallments: number; }; }; callbacks: { onReady: () => void; onError: (error: any) => void; }; }) => any; }) => {

      if (window.paymentBrickController) {
        await window.paymentBrickController.unmount();
      }

      const settings = {
        initialization: {
          amount: 100,
          preferenceId: idPreference,
        },
        customization: {
          visual: {
            hidePaymentButton: true,
            hideFormTitle: true,
            texts: {
              formSubmit: "Proceder al Pago",
              paymentMethods: {
                newCreditCardTitle: "Tarjeta de Credito, de un solo uso",
                newDebitCardTitle: "Tarjeta de Debito, de un solo uso",
                debitCardTitle: "Tarjeta de Debito, de un solo uso",
                creditCardTitle: "Tarjeta de Credito, de un solo uso",
              },
            },
          },
          paymentMethods: {
            mercadoPago: 'all',
            creditCard: "all",
            debitCard: "all",
            maxInstallments: 1
          },
        },
        callbacks: {
          onReady: () => {},
          onError: (error: any) => { /* console.error("Brick error:", error); */ },
        },
      };

      window.paymentBrickController = await bricksBuilder.create(
        "payment",
        "paymentBrick_container",
        settings
      );

    };

    renderPaymentBrick(bricksBuilder);

  }

  submitPurchase(){

    if (window.paymentBrickController) {
      window.paymentBrickController.getFormData()
        .then(({ formData }: { formData: { token: any } }) => {
          this.registerPurchase( formData );
        });
    }

  }

  registerPurchase( formData: { token: any; } ){

    if (window.MP_DEVICE_SESSION_ID) {
      this.deviceSessionId = window.MP_DEVICE_SESSION_ID;
    }

    console.log( formData )
    console.log( formData.token )
    console.log( this.deviceSessionId  )


     if( formData.token && this.deviceSessionId ){

         let data = {
           formdata : formData,
           idfoliocarrito : 1, //id del carrito que estan queriendo cobrar
           iddevice : this.deviceSessionId
         };

         this._storeService.processPayment( data ).subscribe({
           next: (response) => {
             if( response.status === 'success' ){

               console.log( response )

             }else{

               console.log("Ocurrio un Problema");
               console.log(response.mensaje);

             }

           },
           error: ( e ) => {
             let msg = ( e.error )
               ? e.error.message
               : e.message;
             console.log("Ocurrio un Error:" + msg);
           }
         });

     }else{

       console.log( 'La informacion ingresada no ha sido validada, por favor vuelve a intentarlo.' )

   }

  }

}

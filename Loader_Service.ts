import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  loading = null;
  isLoading = false;

  constructor(public Loading: LoadingController) {}

  async showLoader() {
    this.isLoading = true;
    return await this.Loading.create({
      duration: 5000,
      showBackdrop: true,
      spinner: null,
      message: `
                <div class="loading full-page" v-show="loading">
                <div><span></span><span></span><span></span><span></span></div>
              </div>`,
    }).then(a => {
      a.present().then(() => {
      this.isLoading = true;
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async showInfiniteLoader() {
    if(this.isLoading !== true) {
      this.isLoading = true;
      return await this.Loading.create({
        showBackdrop: false,
        spinner: null,
        message: `
                  <div class="loading full-page" v-show="loading">
                  <div><span></span><span></span><span></span><span></span></div>
                </div>`,
      }).then(a => {
        this.loading = a;
        a.present().then(() => {
          this.isLoading = true;
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
          setTimeout(()=> {
            this.LoadingHide();
          },5000);
        });
      });
    }
  }
  
  hideLoader() {
    if(this.isLoading && this.loading){
       this.loading.dismiss().then(() =>{
        this.isLoading = false;
        console.log('dismissed')
      });
    }
  }
}

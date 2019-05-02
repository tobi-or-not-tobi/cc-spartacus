import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StorefrontModule, translations } from '@spartacus/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StorefrontModule.withConfig({
      site: {
        baseSite: 'electronics'
      },
      siteContext: {
        urlEncodingParameters: ['BASE_SITE', 'LANGUAGE', 'CURRENCY'],
        parameters: {
          BASE_SITE: {
            values: ['electronics-spa', 'electronics', 'apparel-de', 'apparel-uk'],
            defaultValue: 'electronics',
            persistence: 'route'
          }
        }
      },
      i18n: {
        resources: translations
      },
      backend: {
        media: {
          baseUrl: 'https://accstorefront.cqz1m-softwarea1-d23-public.model-t.cc.commerce.ondemand.com/'
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

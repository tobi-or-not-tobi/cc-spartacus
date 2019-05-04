import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigModule } from '@spartacus/core';
import { defaultCmsContentConfig, StorefrontModule, translations } from '@spartacus/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StorefrontModule.withConfig({
      siteContext: {
        urlEncodingParameters: ['BASE_SITE', 'LANGUAGE', 'CURRENCY'],
        parameters: {
          BASE_SITE: {
            values: ['electronics-spa', 'electronics', 'apparel-de', 'apparel-uk'],
            defaultValue: 'electronics-spa',
            persistence: 'route'
          }
        }
      },
      i18n: {
        resources: translations
      },
      // use media from api aspect
      // backend: {
      //   media: {
      //     baseUrl: 'https://accstorefront.cqz1m-softwarea1-d23-public.model-t.cc.commerce.ondemand.com/'
      //   }
      // }
      icon: {
        prefix: 'fa-',
        iconClass: 'fas'
      }
    }),
    ConfigModule.withConfigFactory(defaultCmsContentConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

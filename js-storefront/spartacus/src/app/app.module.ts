import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StorefrontModule } from '@spartacus/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StorefrontModule.withConfig({
      site: {
        baseSite: 'electronics-spa'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

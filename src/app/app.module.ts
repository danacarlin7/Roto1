import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

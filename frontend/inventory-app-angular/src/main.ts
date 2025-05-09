import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }        from '@angular/common/http';
import { ReactiveFormsModule }     from '@angular/forms';

import { AppComponent }       from './app/app.component';
import { appRoutes }          from './app/app.routes';

// Angular Material
import { MatToolbarModule }    from '@angular/material/toolbar';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatSnackBarModule }   from '@angular/material/snack-bar';
import { MatTableModule }      from '@angular/material/table';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatSelectModule }     from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSnackBarModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule
    )
  ]
})
.catch(err => console.error(err));

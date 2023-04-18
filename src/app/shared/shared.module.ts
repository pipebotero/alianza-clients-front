import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormErrorMsgComponent } from './components/form-error-msg/form-error-msg.component';

@NgModule({
    imports: [CommonModule, FormsModule,
    // IonicRatingComponentModule
    ],
    declarations: [
        FormErrorMsgComponent
    ],
    // providers: [AuthGuard],
    exports: [
        FormErrorMsgComponent
    ],
})
export class SharedModule {}

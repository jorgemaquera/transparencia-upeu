import { NgModule } from '@angular/core';
// import 'mousetrap';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

//import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MomentTimezoneDateAdapterModule } from '../helpers/moment-timezone-date-adapter';

// import { LoadingShapeComponent } from '../app.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatSliderModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatToolbarModule,
    MatTreeModule,

    // MomentTimezoneDateAdapterModule,
    // DragDropModule
  ],
  // declarations: [
  //     LoadingShapeComponent
  // ],
  exports: [
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatSliderModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatToolbarModule,
    MatTreeModule,

    // MomentTimezoneDateAdapterModule,
    // DragDropModule,

    // LoadingShapeComponent
  ],
  entryComponents: [],
  providers: [
    // { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } }
  ],
})
export class MaterialModule {}

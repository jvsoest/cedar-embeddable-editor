import {Component, Input, OnInit} from '@angular/core';
import {FieldComponent} from '../../models/component/field-component.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComponentDataService} from '../../service/component-data.service';
import {CedarUIComponent} from '../../models/ui/cedar-ui-component.model';
import {ActiveComponentRegistryService} from '../../service/active-component-registry.service';
import {HandlerContext} from '../../util/handler-context';

@Component({
  selector: 'app-cedar-input-textfield',
  templateUrl: './cedar-input-textfield.component.html',
  styleUrls: ['./cedar-input-textfield.component.scss']
})
export class CedarInputTextfieldComponent extends CedarUIComponent implements OnInit {

  component: FieldComponent;
  options: FormGroup;
  inputValueControl = new FormControl(null, Validators.min(10));
  activeComponentRegistry: ActiveComponentRegistryService;
  @Input() handlerContext: HandlerContext;

  constructor(fb: FormBuilder, public cds: ComponentDataService, activeComponentRegistry: ActiveComponentRegistryService) {
    super();
    this.options = fb.group({
      inputValue: this.inputValueControl,
    });
    this.activeComponentRegistry = activeComponentRegistry;
  }

  ngOnInit(): void {
  }

  @Input() set componentToRender(componentToRender: FieldComponent) {
    this.component = componentToRender;
    this.activeComponentRegistry.registerComponent(this.component, this);
  }

  inputChanged($event: Event): void {
    this.handlerContext.changeValue(this.component, ($event.target as HTMLTextAreaElement).value);
  }

  setCurrentValue(currentValue: any): void {
    this.inputValueControl.setValue(currentValue);
  }

}

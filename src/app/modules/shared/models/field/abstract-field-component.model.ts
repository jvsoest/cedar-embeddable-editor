import {FieldComponent} from '../component/field-component.model';
import {BasicInfo} from '../info/basic-info.model';
import {ValueInfo} from '../info/value-info.model';
import {NumberInfo} from '../info/number-info.model';
import {ChoiceInfo} from '../info/choice-info.model';
import {LabelInfo} from '../info/label-info.model';
import {CedarUIComponent} from '../ui/cedar-ui-component.model';

export abstract class AbstractFieldComponent implements FieldComponent {

  className = 'AbstractFieldComponent';
  name: string;
  path: string[];
  basicInfo: BasicInfo = new BasicInfo();
  valueInfo: ValueInfo = new ValueInfo();
  numberInfo: NumberInfo = new NumberInfo();
  choiceInfo: ChoiceInfo = new ChoiceInfo();
  labelInfo: LabelInfo = new LabelInfo();
  uiComponent: CedarUIComponent = null;

  abstract isMulti(): boolean;

  abstract updateViewToReflectData(): void;

  setUIComponent(uiComponent: CedarUIComponent): void {
    this.uiComponent = uiComponent;
  }
}

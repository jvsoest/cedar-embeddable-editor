import {MultiInfo} from '../info/multi-info.model';
import {ElementComponent} from '../component/element-component.model';
import {MultiComponent} from '../component/multi-component.model';
import {CurrentMultiInfo} from '../info/current-multi-info.model';
import {AbstractElementComponent} from './abstract-element-component.model';
import {DataObjectService} from '../../service/data-object.service';

export class MultiElementComponent extends AbstractElementComponent implements ElementComponent, MultiComponent {

  className = 'MultiElementComponent';
  multiInfo: MultiInfo = new MultiInfo();
  currentMultiInfo: CurrentMultiInfo = new CurrentMultiInfo();

  getCurrentMultiCount(): number {
    return this.currentMultiInfo.count;
  }

  setCurrentMultiCount(index: number, dataObjectService: DataObjectService): void {
    this.currentMultiInfo.currentIndex = index;
  }

  isMulti(): boolean {
    return true;
  }

  hasMultiInstances(): boolean {
    return this.currentMultiInfo.count > 0;
  }

  updateViewToReflectData(): void {
  }
}

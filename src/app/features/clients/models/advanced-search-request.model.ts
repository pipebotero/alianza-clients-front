import { IDeserializable } from 'src/app/shared/models/deserializable.model';
import { SearchCriteriaRequest } from './search-criteria-request.model';

export class AdvancedSearchRequest implements IDeserializable {
  dataOption: string;
  searchCriteriaList: SearchCriteriaRequest[];

  public deserialize(input: any): this {
    Object.assign(this, input);
    this.searchCriteriaList = [];
    if(input.searchCriteriaList.length> 0) {
      this.searchCriteriaList = input.searchCriteriaList.map((searchCriteria) =>
      new SearchCriteriaRequest().deserialize(searchCriteria)
    );
    }
    
    return this;
  }
}

export class JsonSchema {

  // special properties used to add attribute-value fields to the model
  static reservedAttributeName = 'reserved_attribute_name';
  static reservedAttributeValue = 'reserved_attribute_value';

  static properties = 'properties';

  static atContext = '@context';
  static atId = '@id';
  static atType = '@type';
  static atValue = '@value';
  static schemaIsBasedOn = 'schema:isBasedOn';
  static schemaName = 'schema:name';
  static schemaDescription = 'schema:description';
  static pavDerivedFrom = 'pav:derivedFrom';
  static pavCreatedOn = 'pav:createdOn';
  static pavCreatedBy = 'pav:createdBy';
  static pavLastUpdatedOn = 'pav:lastUpdatedOn';
  static oslcModifiedBy = 'oslc:modifiedBy';
  static rdfsLabel = 'rdfs:label';

  static builtInProperties: Map<string, boolean> = new Map([
    [JsonSchema.atId, true],
    [JsonSchema.atContext, true],
    [JsonSchema.atType, true],
    [JsonSchema.schemaIsBasedOn, true],
    [JsonSchema.schemaName, true],
    [JsonSchema.schemaDescription, true],
    [JsonSchema.pavDerivedFrom, true],
    [JsonSchema.pavCreatedOn, true],
    [JsonSchema.pavCreatedBy, true],
    [JsonSchema.pavLastUpdatedOn, true],
    [JsonSchema.oslcModifiedBy, true]
  ]);

}

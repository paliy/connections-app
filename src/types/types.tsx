export interface Variable {
  name: string;
  placeholderName: string;
}

export interface FeedExport {
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
}

export interface AdditionalSource {
  name: string;
  mappingFields: string[];
}

export interface Rule {
  name: string;
  getConditionsPlaceholders: string[];
}

export interface KeywordSetting {
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
}

export interface BaseAdtext {
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
}

export interface CampaignSetting {
  name: string;
  getPlaceholdersWithoutConditions: string[];
  getConditionsPlaceholders: string[];
  bidRules: Rule[];
  keywordSettings: KeywordSetting[];
  baseAdtexts: BaseAdtext[];
}

export interface Connection {
  from: string;
  to: string;
}

// Define the data structure

export interface Data {
  variables: {
    variables: Variable[];
  };
  feedExports: {
    feedExports: FeedExport[];
  };
  additionalSources: {
    additionalSources: AdditionalSource[];
  };
  campaignSettings: {
    campaignSettings: CampaignSetting[];
  };
}

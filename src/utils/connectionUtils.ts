// import { Connection } from '../components/VariableConnectionsDiagram';
import { Data, Variable, FeedExport, AdditionalSource, CampaignSetting, Rule, KeywordSetting, BaseAdtext, Connection } from '../types/types';

export function findVariableConnections(data: Data): Connection[] {
  const connections: Connection[] = [];

  const variables: Variable[] = data.variables.variables;
  variables.forEach(variable => {
    // Check feedExports
    data.feedExports.feedExports.forEach((feedExport: FeedExport) => {
      if (isUsed(variable.placeholderName, feedExport)) {
        connections.push({ from: variable.name, to: feedExport.name });
      }
    });

    // Check additionalSources
    data.additionalSources.additionalSources.forEach((source: AdditionalSource) => {
      if (isUsed(variable.placeholderName, source)) {
        connections.push({ from: variable.name, to: source.name });
      }
    });

    // Check campaignSettings
    data.campaignSettings.campaignSettings.forEach((setting: CampaignSetting) => {
      if (isUsed(variable.placeholderName, setting)) {
        connections.push({ from: variable.name, to: setting.name });
      }
      setting.bidRules.forEach((rule: Rule) => {
          connections.push({ from: variable.name, to: rule.name });
      });
      setting.keywordSettings.forEach((keyword: KeywordSetting) => {
        if (isUsed(variable.placeholderName, keyword)) {
          connections.push({ from: variable.name, to: keyword.name });
        }
      });
      setting.baseAdtexts.forEach((adtext: BaseAdtext) => {
        if (isUsed(variable.placeholderName, adtext)) {
          connections.push({ from: variable.name, to: adtext.name });
        }
      });
    });
  });

  return connections;
}

export function isUsed(placeholderName: string, entity: unknown): boolean {
  if (typeof entity === 'object' && entity !== null) {
    const { getPlaceholdersWithoutConditions, getConditionsPlaceholders } = entity as { 
      getPlaceholdersWithoutConditions?: string[], 
      getConditionsPlaceholders?: string[] 
    };

    if (
      getPlaceholdersWithoutConditions?.includes(placeholderName) ||
      getConditionsPlaceholders?.includes(placeholderName)
    ) {
      return true;
    }
  }
  return false;
}



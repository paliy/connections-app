import { findVariableConnections, isUsed } from "../utils/connectionUtils";
import { data } from '../testData.json'

describe('findVariableConnections function', () => {
  it('should return correct connections', () => {

    const connections = findVariableConnections(data);

    expect(connections).toHaveLength(73);
  });

  it('should return empty array when there are no connections', () => {
    const data = {
      variables: {
        variables: [
          { placeholderName: 'placeholder1', name: 'variable1' },
          { placeholderName: 'placeholder2', name: 'variable2' },
        ],
      },
      feedExports: {
        feedExports: [],
      },
      additionalSources: {
        additionalSources: [],
      },
      campaignSettings: {
        campaignSettings: [],
      },
    };

    const connections = findVariableConnections(data);

    expect(connections).toHaveLength(0);
  });
});


describe('isUsed function', () => {
  it('should return true if placeholderName is included in getPlaceholdersWithoutConditions', () => {
    const placeholderName = 'placeholder1';
    const entity = { getPlaceholdersWithoutConditions: ['placeholder1', 'placeholder2'] };

    const result = isUsed(placeholderName, entity);

    expect(result).toBe(true);
  });

  it('should return true if placeholderName is included in getConditionsPlaceholders', () => {
    const placeholderName = 'placeholder1';
    const entity = { getConditionsPlaceholders: ['placeholder1', 'placeholder2'] };

    const result = isUsed(placeholderName, entity);

    expect(result).toBe(true);
  });

  it('should return false if placeholderName is not included in getPlaceholdersWithoutConditions or getConditionsPlaceholders', () => {
    const placeholderName = 'placeholder1';
    const entity = { getPlaceholdersWithoutConditions: ['placeholder2'], getConditionsPlaceholders: ['placeholder3'] };

    const result = isUsed(placeholderName, entity);

    expect(result).toBe(false);
  });

  it('should return false if entity is not an object', () => {
    const placeholderName = 'placeholder1';
    const entity = null;

    const result = isUsed(placeholderName, entity);

    expect(result).toBe(false);
  });

  it('should return false if entity is null', () => {
    const placeholderName = 'placeholder1';
    const entity = null;

    const result = isUsed(placeholderName, entity);

    expect(result).toBe(false);
  });
});



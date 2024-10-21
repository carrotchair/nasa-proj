import getMeteorData from '../repository/meteorClient.ts';

interface Meteor {
  id: string;
  name: string;
  estimated_diameter?: {
    meters?: {
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_second: string;
    };
  }[];
}

interface FilteredMeteor {
  id: string;
  name: string;
  diameter_in_meters?: number;
  is_potentially_hazardous_meteor: boolean;
  close_approach_date_full: string;
  relative_velocity_kilometers_per_second: string;
}

interface MeteorResponseData {
  meteorData: FilteredMeteor[];
  count?: number;
  wereDangerousMeteors?: boolean;
}

const getMeteorFilteredData = async (
  startDate: string,
  endDate: string,
  count: boolean,
  wereDangerousMeteors: boolean
): Promise<MeteorResponseData> => {
  const meteorData: Record<string, Meteor[]> = await getMeteorData(startDate, endDate);
  const filteredMeteorList: FilteredMeteor[] = [];

  Object.values(meteorData).forEach((value) => {
    value.forEach((meteor) => {
      filteredMeteorList.push({
        id: meteor.id,
        name: meteor.name,
        diameter_in_meters: meteor.estimated_diameter?.meters?.estimated_diameter_max,
        is_potentially_hazardous_meteor: meteor.is_potentially_hazardous_asteroid,
        close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
        relative_velocity_kilometers_per_second: meteor.close_approach_data[0].relative_velocity.kilometers_per_second,
      });
    });
  });

  const responseData: MeteorResponseData = { meteorData: filteredMeteorList };

  if (count) {
    responseData.count = filteredMeteorList.length;
  }

  if (wereDangerousMeteors) {
    responseData.wereDangerousMeteors = filteredMeteorList.some(
      (meteor) => meteor.is_potentially_hazardous_meteor
    );
  }

  return responseData;
};

export default getMeteorFilteredData;
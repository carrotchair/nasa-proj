import getMeteorData from '../repository/meteorClient.js';

const getMeteorFilteredData = async (startDate, endDate) => {
  const meteorData = await getMeteorData(startDate, endDate);
  const filteredMeteorList = [];

  Object.values(meteorData).forEach((value) => {
    value.forEach((meteor) => {
      filteredMeteorList.push({
        id: meteor.id,
        name: meteor.name,
        diameter_in_meters: meteor.estimated_diameter.meters,
        is_potentially_hazardous_meteor:
          meteor.is_potentially_hazardous_asteroid,
        close_approach_date_full:
          meteor.close_approach_data[0].close_approach_date_full,
        relative_velocity_kilometers_per_second:
          meteor.close_approach_data[0].relative_velocity.kilometers_per_second
      });
    });
  });

  return filteredMeteorList;
};

export default getMeteorFilteredData;
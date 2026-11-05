import Healthkit, {
  HKQuantityTypeIdentifier,
  HKStatisticsOptions,
} from '@kingstinct/react-native-healthkit';
import {useQuery} from '@tanstack/react-query';

export const useHRForInterval = ({from, to}: {from: Date; to: Date}) => {
  return useQuery(['hr', from, to], async () => {
    const data = await Healthkit.queryQuantitySamples(
      HKQuantityTypeIdentifier.heartRate,
      {
        from: from,
        to: to,
      },
    );

    return data;
  });
};

export const useHRStatistics = ({from, to}: {from: Date; to: Date}) => {
  return useQuery(['hr', 'average', from, to], async () => {
    const data = await Healthkit.queryStatisticsForQuantity(
      HKQuantityTypeIdentifier.heartRate,
      [
        HKStatisticsOptions.discreteAverage,
        HKStatisticsOptions.discreteMax,
        HKStatisticsOptions.discreteMin,
      ],
      from,
      to,
    );

    return data;
  });
};

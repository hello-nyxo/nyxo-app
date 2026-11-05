import Healthkit, {
  HKCategorySample,
  HKCategoryTypeIdentifier,
} from '@kingstinct/react-native-healthkit';
import {format, subDays} from 'date-fns';
import {useQuery} from '@tanstack/react-query';
import {groupBy, reduce} from 'lodash';

type Sample = HKCategorySample<HKCategoryTypeIdentifier.sleepAnalysis>;

const sleepValueMap = {
  0: 'in bed',
  1: 'asleep',
  2: 'awake',
  3: 'core',
  4: 'deep',
  5: 'rem',
};

type Data = {
  title: string;
  data: HKCategorySample<HKCategoryTypeIdentifier.sleepAnalysis>[];
};

export const useSleep = () => {
  return useQuery(
    ['sleep'],
    async () => {
      const data = await Healthkit.queryCategorySamples(
        HKCategoryTypeIdentifier.sleepAnalysis,
        {
          from: subDays(new Date(), 200),
          to: new Date(),
        },
      );

      return data;
    },
    {
      select: data => {
        const grouped = groupBy(data, o => format(o.endDate, 'dd-MM-yyyy'));
        // reduce to generate new array
        const formatted: Data[] = reduce(
          grouped,
          (acc: Data[], next, index) => {
            acc.push({
              title: index,
              data: next,
            });
            return acc;
          },
          [],
        );

        return formatted.reverse();
      },
    },
  );
};

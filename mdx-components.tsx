import type { MDXComponents } from 'mdx/types';
import Theorem from '@/app/ui/theorem';
import References from '@/app/ui/references';
import Figure from '@/app/ui/figure';

const components: MDXComponents = {
  Theorem,
  References,
  Figure,
};

export function useMDXComponents(): MDXComponents {
  return components
};

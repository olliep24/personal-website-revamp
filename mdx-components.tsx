import type { MDXComponents } from 'mdx/types';
import Theorem from '@/app/ui/theorem';
import References from '@/app/ui/references';

const components: MDXComponents = {
  Theorem,
  References,
};

export function useMDXComponents(): MDXComponents {
  return components
};

import type { MDXComponents } from 'mdx/types';
import Theorem from '@/app/ui/theorem';

const components: MDXComponents = {
  Theorem,
};

export function useMDXComponents(): MDXComponents {
  return components
};

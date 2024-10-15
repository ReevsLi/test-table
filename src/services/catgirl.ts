// There are no issues for you to fix in this file
// Please ignore this file

import { useState } from 'react';

const initialValue = localStorage.getItem('catgirlExplainer') || '';

export function useCatgirlExplainer(): {
  isShown: boolean;
  toggle: () => void;
} {
  const [isShown, setIsShown] = useState(initialValue !== 'false');
  const toggle = () =>
    setIsShown((v) => {
      localStorage.setItem('catgirlExplainer', Boolean(!v).toString());
      return !v;
    });

  return { isShown, toggle };
}

import { useState, MouseEvent } from 'react';

const useDatepicker = () => {
  const [opendDatepicker, setOpendDatepicker] = useState<string>('');

  const onOpenDatepicker = (type: string) => {
    setOpendDatepicker(type);
  };

  const onCloseDatepicker = (e: MouseEvent<HTMLElement>) => {
    if (opendDatepicker === '') return;
    if ((e.target as HTMLElement).closest('.datepicker')) return;
    setOpendDatepicker('');
  };

  return {
    opendDatepicker,
    onOpenDatepicker,
    onCloseDatepicker,
  };
};

export default useDatepicker;

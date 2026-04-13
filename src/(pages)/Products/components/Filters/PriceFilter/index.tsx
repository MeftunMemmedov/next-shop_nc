'use client';
import { useState } from 'react';

import RangeSlider, {
  ReactRangeSliderInputProps,
} from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { ArrowDownIcon } from '@/assets/images/icons';

const PriceFilter = () => {
  const [isVisible, setisVisible] = useState<boolean>(true);

  const minPrice = 0;
  const maxPrice = 2000;

  const [values, setValues] = useState<string[]>(['0', '2000']);

  const rangeSliderOptions: ReactRangeSliderInputProps = {
    className: 'mb-3',
    min: minPrice,
    max: maxPrice,
    value: [Number(values[0]), Number(values[1])],
    onInput: (val: number[]) => {
      setValues([val[0].toString(), val[1].toString()]);
    },
    // onThumbDragEnd: () => {
    //   const min = Math.min(Number(values[0]), Number(values[1]));
    //   const max = Math.max(Number(values[0]), Number(values[1]));
    //   setPriceQuery({
    //     price__gte: min,
    //     price__lte: max,
    //   });
    //   if (pageQuery && pageQuery > 1) {
    //     setPageQuery(1);
    //   }
    // },
    // onRangeDragEnd: () => {
    //   const min = Math.min(Number(values[0]), Number(values[1]));
    //   const max = Math.max(Number(values[0]), Number(values[1]));
    //   setPriceQuery({
    //     price__gte: min,
    //     price__lte: max,
    //   });
    //   if (pageQuery && pageQuery > 1) {
    //     setPageQuery(1);
    //   }
    // },
  };

  const handleInputChange =
    (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue === '' || /^\d+$/.test(newValue)) {
        const newValues = [...values] as [string, string];
        newValues[index] = newValue;
        setValues(newValues);
      }
    };

  const handleInputBlur = (index: 0 | 1) => () => {
    let numValue = Number(values[index]);
    numValue = Math.max(minPrice, Math.min(maxPrice, numValue));

    const newValues = [...values] as [string, string];
    newValues[index] = numValue.toString();

    if (index === 0 && numValue > Number(newValues[1])) {
      newValues[0] = newValues[1];
    } else if (index === 1 && numValue < Number(newValues[0])) {
      newValues[1] = newValues[0];
    }

    setValues(newValues);

    // setPriceQuery({
    //   price__gte: Number(newValues[0]),
    //   price__lte: Number(newValues[1]),
    // });
  };

  return (
    <div className="accordion">
      <div className="accordion-item mb-4">
        <h5 className="accordion-header mb-2">
          <button
            className={`accordion-button p-0 border-0 fs-5 text-uppercase ${!isVisible ? 'collapsed' : ''}`}
            onClick={() => setisVisible(!isVisible)}
          >
            Price
            <ArrowDownIcon className="accordion-button__icon type2" />
          </button>
        </h5>

        <div
          className={`accordion-collapse filters ${isVisible ? 'show' : 'hide'} border-0`}
        >
          <div className="product-left-item mb-50">
            <div className="filter-widget-content">
              <div className="filter-price">
                <div className="slider-range pt-4">
                  <RangeSlider {...rangeSliderOptions} />
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <label htmlFor="min-price">Min.</label>
                      <input
                        type="text"
                        id="min-price"
                        name="gte"
                        className="price-input border px-2 py-1"
                        value={values[0]}
                        onChange={handleInputChange(0)}
                        onBlur={handleInputBlur(0)}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="max-price">Max.</label>
                      <input
                        type="text"
                        id="max-price"
                        name="lte"
                        className="price-input border px-2 py-1 rounded"
                        value={values[1]}
                        onChange={handleInputChange(1)}
                        onBlur={handleInputBlur(1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;

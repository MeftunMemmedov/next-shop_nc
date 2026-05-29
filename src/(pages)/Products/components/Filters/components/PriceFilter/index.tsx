'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import RangeSlider, {
  ReactRangeSliderInputProps,
} from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { ArrowDownIcon } from '@/assets/images/icons';
import { FilterParams } from '@/types';

const PriceFilter = ({
  setFilters,
  filters,
}: {
  filters: FilterParams;
  setFilters: Dispatch<SetStateAction<FilterParams>>;
}) => {
  const [isVisible, setisVisible] = useState<boolean>(true);

  const minPrice = 0;
  const maxPrice = 2000;
  const { price_gte, price_lte } = filters;

  const [inputs, setInputs] = useState<string[]>([
    String(price_gte),
    String(price_lte),
  ]);

  const [values, setValues] = useState<number[]>([price_gte!, price_lte!]);

  const updateUrl = (v: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price_gte: v[0],
      price_lte: v[1],
    }));
  };

  const rangeSliderOptions: ReactRangeSliderInputProps = {
    className: 'mb-3',
    min: minPrice,
    max: maxPrice,
    value: [Number(values[0]), Number(values[1])],
    onInput: (val: number[]) => {
      setValues([val[0], val[1]]);
    },
    onThumbDragEnd: () => updateUrl(values),
    onRangeDragEnd: () => updateUrl(values),
  };

  const handleInputChange =
    (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue === '' || /^\d+$/.test(newValue)) {
        const newValues = [...inputs];
        newValues[index] = newValue;
        setInputs(newValues);
      }
    };

  const handleInputBlur = (index: 0 | 1) => () => {
    let numValue = Number(inputs[index]);
    numValue = Math.max(minPrice, Math.min(maxPrice, numValue));

    const newValues = [...values] as [number, number];
    newValues[index] = numValue;

    if (index === 0 && numValue > Number(newValues[1])) {
      newValues[0] = newValues[1];
    } else if (index === 1 && numValue < Number(newValues[0])) {
      newValues[1] = newValues[0];
    }

    setValues(newValues);
    setInputs([String(newValues[0]), String(newValues[1])]);
    updateUrl(newValues);
  };

  useEffect(() => {
    const currentMin = price_gte ?? minPrice;
    const currentMax = price_lte ?? maxPrice;

    setValues([currentMin, currentMax]);
    setInputs([String(currentMin), String(currentMax)]);
  }, [price_gte, price_lte]);

  return (
    <div className="accordion">
      <div className="accordion-item mb-4">
        <h5 className="accordion-header mb-2">
          <button
            className={`accordion-button p-0 border-0 fs-5 text-uppercase ${!isVisible ? 'collapsed' : ''}`}
            onClick={() => setisVisible(!isVisible)}>
            Price
            <ArrowDownIcon className="accordion-button__icon type2" />
          </button>
        </h5>

        <div
          className={`accordion-collapse filters ${isVisible ? 'show' : 'hide'} border-0`}>
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
                        value={inputs[0]}
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
                        value={inputs[1]}
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

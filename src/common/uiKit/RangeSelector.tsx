"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import Input from "@/common/uiKit/Input";

const THUMB_WIDTH = 24;

const getPercentage = (value: number, minValue: number, maxValue: number) => {
  return ((value - minValue) / (maxValue - minValue)) * 100;
};

interface Props {
  min?: number;
  max?: number;
  step?: number;
  initialValues?: { min: number; max: number };
  onChange: (values: { min: number; max: number }) => void;
}

interface ThumbProps {
  id: string;
  style: React.CSSProperties;
  isAtEnd?: boolean;
  setValues: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  setInputValues: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  value: number;
  step: number;
  min: number;
  max: number;
  boundaryValue: number;
  sliderRef: React.RefObject<HTMLDivElement>;
  onChange: (value: number) => void;
}

const Thumb: React.FC<ThumbProps> = (props) => {
  const info = useRef<{
    initialX: number;
    id: string;
    initialLeft: number;
  } | null>(null);
  const updatedValue = useRef(props.value);

  const onMouseMove = (e: MouseEvent) => {
    if (!info.current) return;

    let possibleMin = props.min,
      possibleMax = props.max;

    if (info.current.id === "min") {
      possibleMax = props.boundaryValue;
    } else {
      possibleMin = props.boundaryValue;
    }

    const diffX = e.clientX - info.current.initialX;

    const sliderDimensions = props.sliderRef.current!.getBoundingClientRect();

    const newX =
      info.current.initialLeft + diffX + THUMB_WIDTH / 2 - sliderDimensions.x;

    let newValue =
      Math.trunc(
        ((getPercentage(newX, 0, sliderDimensions.width) / 100) *
          (props.max - props.min) +
          props.min) /
          props.step,
      ) * props.step;

    if (newValue < possibleMin) {
      newValue = possibleMin;
    } else if (newValue > possibleMax) {
      newValue = possibleMax;
    }

    props.setValues((prev) => {
      let newValues: { min: number; max: number };
      if (info.current?.id === "max") {
        updatedValue.current = newValue;
        newValues = {
          ...prev,
          max: newValue,
        };
      } else if (info.current?.id === "min") {
        updatedValue.current = newValue;
        newValues = {
          ...prev,
          min: newValue,
        };
      } else newValues = prev;

      props.setInputValues({ ...newValues });
      return newValues;
    });
  };

  const onMouseUp = () => {
    info.current = null;
    props.onChange(updatedValue.current);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  };

  return (
    <div
      id={props.id}
      className={
        "absolute z-10 h-6 w-6 cursor-pointer rounded-full border border-slate-900 bg-neutral-50"
      }
      style={props.style}
      onMouseDown={(e) => {
        e.preventDefault();
        if (props.min === props.max) return;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        const dimensions = (e.target as HTMLDivElement).getBoundingClientRect();

        info.current = {
          initialX: e.clientX,
          initialLeft: dimensions.left,
          id: props.isAtEnd ? "min" : (e.target as HTMLButtonElement).id,
        };
      }}
      onDragStart={() => false}
    />
  );
};

const RangeFilter: React.FC<Props> = ({
  min = 1000,
  max = 15000,
  step = -1,
  onChange,
  initialValues,
}) => {
  const [values, setValues] = useState({
    min: initialValues?.min || min,
    max: initialValues?.max || max,
  });
  const [inputValues, setInputValues] = useState({
    min: initialValues?.min || min,
    max: initialValues?.max || max,
  });
  const sliderRef = useRef<HTMLDivElement>(null);
  if (step === -1) step = Math.floor((max - min) / 50);

  useEffect(() => {
    setValues({
      min: initialValues?.min || min,
      max: initialValues?.max || max,
    });
    setInputValues({
      min: initialValues?.min || min,
      max: initialValues?.max || max,
    });
  }, [initialValues?.min, initialValues?.max]);

  useEffect(() => {
    if (
      initialValues?.min !== undefined &&
      initialValues?.max !== undefined &&
      initialValues.min >= min &&
      initialValues.max <= max
    )
      return;

    setValues({ min, max });
    setInputValues({ min, max });
  }, [max, min]);

  const handleInputValues = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    if (("key" in e && e.key === "Enter") || e.type === "blur") {
      // forbidden values
      if (
        inputValues.min > inputValues.max ||
        inputValues.min < min ||
        inputValues.max > max
      )
        setInputValues({ ...values });
      else {
        setValues({ ...inputValues });
        onChange({ ...inputValues });
      }
    }
  };

  return (
    <div className={"flex w-full flex-col"}>
      <div className={"flex w-full flex-col gap-2"}>
        <Input
          label={"Min"}
          pattern='[0-9]'
          wrapperClasses={"text-sm"}
          value={inputValues.min}
          onChange={(e) =>
            !isNaN(Number(e.target.value)) &&
            setInputValues((prev) => ({ ...prev, min: Number(e.target.value) }))
          }
          disabled={min === max}
          onKeyDown={handleInputValues}
          onBlur={handleInputValues}
        />
        <Input
          label={"Max"}
          pattern='[0-9]'
          wrapperClasses={"text-sm"}
          value={inputValues.max}
          onChange={(e) =>
            !isNaN(Number(e.target.value)) &&
            setInputValues((prev) => ({ ...prev, max: Number(e.target.value) }))
          }
          disabled={min === max}
          onKeyDown={handleInputValues}
          onBlur={handleInputValues}
        />
      </div>
      <div
        ref={sliderRef}
        style={{ marginRight: THUMB_WIDTH / 2, marginLeft: THUMB_WIDTH / 2 }}
        className='relative mb-5 mt-5 flex h-2 items-center justify-center rounded-lg bg-gray-200'
      >
        <Thumb
          id={"min"}
          sliderRef={sliderRef}
          style={{
            left: `calc(${getPercentage(values.min, min, max)}% - ${THUMB_WIDTH / 2}px)`,
          }}
          isAtEnd={values.max === values.min && values.max === max}
          setValues={setValues}
          setInputValues={setInputValues}
          value={values.min}
          boundaryValue={values.max}
          onChange={(newMinValue) =>
            onChange({ min: newMinValue, max: values.max })
          }
          step={step}
          min={min}
          max={max}
        />
        <Thumb
          id={"max"}
          sliderRef={sliderRef}
          style={{
            left: `calc(${getPercentage(values.max, min, max)}% - ${THUMB_WIDTH / 2}px)`,
          }}
          isAtEnd={values.max === values.min && values.max === max}
          setValues={setValues}
          setInputValues={setInputValues}
          value={values.max}
          boundaryValue={values.min}
          onChange={(newMaxValue) =>
            onChange({ min: values.min, max: newMaxValue })
          }
          step={step}
          min={min}
          max={max}
        />
        <span
          className={"absolute h-full rounded bg-slate-600"}
          style={{
            left: `${getPercentage(values.min, min, max)}%`,
            right: `${getPercentage(max - values.max + min, min, max)}%`,
          }}
        />
      </div>
    </div>
  );
};

const compareProps = (prevProps: Props, nextProps: Props) =>
  prevProps.min === nextProps.min &&
  prevProps.max === nextProps.max &&
  prevProps.initialValues?.min === nextProps.initialValues?.min &&
  prevProps.initialValues?.max === nextProps.initialValues?.max;

export default memo(RangeFilter, compareProps);

import React, { useState } from "react";

interface IParam {
  id: number;
  name: string;
}

interface IParamValue {
  paramId: number;
  value: string;
}

interface IModel {
  paramValues: IParamValue[];
}

interface IEditorProps {
  params: IParam[];
  model: IModel;
}

const params = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
];

const initialModel = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const ParamEditor: React.FC<IEditorProps> = ({ params, model }) => {
  // expecting that *params* and *initialModel*  will never be null or undefined
  const [paramValues, setParamValues] = useState(model.paramValues);

  const handleChange: (paramId: number, value: string) => void = (paramId, value) => {
    setParamValues((prevParamValues) => {
      const updatedParam = prevParamValues.find((param) => param.paramId === paramId);
      if (updatedParam) {
        updatedParam.value = value;
      }

      return [...prevParamValues];
    });
  };

  return (
    <div className="param__editor">
      <h1>Редактирование товара</h1>
      {params.map((param) => (
        <div key={param.id} className="input__wrapper">
          <label htmlFor={`param-${param.id}`}>{param.name}:</label>
          <input
            type="text"
            id={`param-${param.id}`}
            value={paramValues.find((p) => p.paramId === param.id)?.value || ""}
            onChange={(e) => handleChange(param.id, e.target.value)}
          />
        </div>
      ))}

      <pre>{JSON.stringify(paramValues, null, 2)}</pre>
    </div>
  );
};

const App: React.FC = () => {
  // expecting that *params* and *initialModel*  will never be null or undefined

  // pass initialModel to model because we didn`t have any API request to fetch that data.

  return (
    <div className="app">
      <ParamEditor params={params} model={initialModel} />
    </div>
  );
};

export default App;

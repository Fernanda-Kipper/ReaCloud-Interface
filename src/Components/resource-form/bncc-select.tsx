import React, { useState, useEffect } from "react";
import Select, { GroupBase, MultiValue } from "react-select";
import Papa from "papaparse";
import _ from "lodash";
import { OptionType } from "../../Interfaces/option";
import { Label } from "../label";

import "../../Styles/components/custom-select.css";

const filesPath = [
  'ed_infantil_tracos-sons.csv',
  'ed_infantil_corpo-gestos-mov.csv',
  'ed_infantil_escuta-fala-pens.csv',
  'ed_infantil_espaços-tempos-quan.csv',
  'ed_infantil_o-eu-o-outro.csv',
  'en_medio_ciencias-Humanas-e-soc.csv',
  'en_medio_lingua-portuguesa.csv',
  'en_medio_linguagens-e-suas-tecn.csv',
  'en_medio_matematica-e-suas-tecn.csv',
  'fundamental_arte.csv',
  'fundamental_ciencias.csv',
  'fundamental_ed_fisica.csv',
  'fundamental_en-religioso.csv',
  'fundamental_geografia.csv',
  'fundamental_historia.csv',
  'fundamental_ingles.csv',
  'fundamental_lp.csv',
  'fundamental_matematica.csv',
]

export type ValueType<OptionType> = OptionType[] | null | undefined;

type Data = {
  options: OptionType[];
  label: String;
}[];

interface Props {
  selectedOption: OptionType[] | null | undefined,
  setSelectedOption: (value: MultiValue<OptionType> | null | undefined) => void
}
  
export function BnccSelect({ selectedOption, setSelectedOption }: Props) {
  const [data, setData] = useState<Data>([]);

  useEffect(() => {
    for (const path of filesPath) {
      Papa.parse('/' + path, {
        download: true,
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as string[][];
          const flatData = data.flat() ?? [];
          const groupLabel = path.replace('.csv', '')
          setData(previous => [...previous,             
            {
              label: groupLabel,
              options: flatData.map(item => ({ label: item + " - " + groupLabel, value: item}))
            }
          ]);
        }
      })
    }
  }, []);
  
  function handleSelectChange(selectedOption: MultiValue<OptionType>){
    setSelectedOption(selectedOption);
  }

  return (
    <div className="custom-select-wrapper">
    <Label name="bncc" label="Código BNCC"  isRequired />
    <Select
      options={data as unknown as GroupBase<OptionType>[]}
      onChange={handleSelectChange}
      value={selectedOption}
      placeholder="Digite o código BNNC"
      isClearable
      isSearchable
      isMulti
      className="custom-select"
    />
    </div>
  );
}
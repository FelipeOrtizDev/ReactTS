import { useEffect } from "react";
import { InfoBox, Labeln, SectionBox, SectionTitle } from "../../pages/Fechamento/styles";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo, Formn, ObsArea } from "../../utils/modals/modalUserStyles";
import { useStore } from "./formsStore";
import { UseFormReturn } from "react-hook-form";
import { createAcatamentosAbertura, updateAcatamentosAbertura } from "../../services/api/Acatamento/acatamentosAberturaService";

interface AcatamentoAberturaFormProps {
    form: UseFormReturn<AcatamentosAbertura>;
}

const AcamentoAberturaForm: React.FC<AcatamentoAberturaFormProps> = ({ form }) => {
    const { register } = form;

    const acatamentoAbertura = useStore((state) => state.acatamentoAbertura);
    const allFieldsFilled = () => {
        return (
          acatamentoAbertura.SB_DataAcatamentoAbertura !== undefined &&
          acatamentoAbertura.SB_EquipeResponsavelAbertura !== "" &&
          // Adicione mais validações conforme necessário
          true
        );
      };

      useEffect(() => {
        if (allFieldsFilled()) {
          (async () => {
            try {
              if (acatamentoAbertura.id_AcatamentosAbertura) {
                await updateAcatamentosAbertura(acatamentoAbertura.id_AcatamentosAbertura, acatamentoAbertura);
              } else {
                await createAcatamentosAbertura(acatamentoAbertura);
              }
              console.log("acatamentoAbertura enviado com sucesso");
            } catch (error) {
              console.error("Erro ao enviar acatamentoAbertura:", error);
            }
          })();
        }
      }, [acatamentoAbertura]);

    return (
        <Formn>
            <SectionBox>
                <SectionTitle>Acatamento Abertura</SectionTitle>
                <FieldTwo>
                    <InfoBox>
                        <Labeln>Data Acatamento</Labeln>
                        <Inputn
                            type="date"
                            {...register("SB_DataAcatamentoAbertura", {
                                required: "Data Acatamento é obrigatória",
                            })}
                        /* onChange={handleInputChange} */
                        />
                    </InfoBox>
                    <InfoBox>
                        <Labeln>Passado Para</Labeln>
                        <Inputn
                            type="text"
                            {...register("SB_EquipeResponsavelAbertura", {
                                required: "Responsável é obrigatório",
                            })}
                        /* onChange={handleInputChange} */
                        />
                    </InfoBox>
                </FieldTwo>
                <FieldTwo>
                    <InfoBox>
                        <Labeln>Previsão</Labeln>
                        <Inputn
                            type="time"
                            {...register("SB_PrevisaoAcatamentoAbertura", {
                                required: "Previsão é obrigatória",
                            })}
                        /* onChange={handleInputChange} */
                        />
                    </InfoBox>
                    <InfoBox>
                        <Labeln>Observações</Labeln>
                        <ObsArea
                            {...register("SB_ObservacaoAcatamentoAbertura")}
                        /* onChange={handleInputChange} */
                        />
                    </InfoBox>
                </FieldTwo>
            </SectionBox>
        </Formn>
    );
};

export default AcamentoAberturaForm;
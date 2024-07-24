import { Box, Field, InfoBox, Inputn, Labeln, SectionBox, SectionTitle, Title } from "./styles"

const vrfFechamento = () => {
    return (<>
        <Box>
            <Title>Solicitação Verificação de Fechamentos</Title>
            <Field>
                <SectionTitle>Dados do Solicitante</SectionTitle>
                <SectionBox>
                    <InfoBox>
                        <Labeln>Data</Labeln>
                        <Inputn type="date" />
                    </InfoBox>
                    <InfoBox>
                        <Labeln>Hora</Labeln>
                        <Inputn type="time" />
                    </InfoBox>
                    <InfoBox>
                        <Labeln>Polo</Labeln>
                        <Inputn type="text" />
                    </InfoBox>
                    <InfoBox>
                        <Labeln>Solictante</Labeln>
                        <Inputn type="text" />
                    </InfoBox>
                    <InfoBox>
                        <Labeln>Responsável</Labeln>
                        <Inputn type="text" />
                    </InfoBox>
                </SectionBox>
            </Field>
        </Box>
    </>)
}
export default vrfFechamento
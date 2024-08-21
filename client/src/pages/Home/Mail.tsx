import { styled, Typography } from '@mui/material';

type mailType = {
    to: string;
    cc: string;
    subject: string;
    body: string;
};

function Mail(props: { mail: mailType }) {
    const mailto = computeMailto(props.mail);
    return (
        <>
            <a href={mailto}>Envoyer le mail</a>

            <Label>Destinataire :</Label>
            <Value>{props.mail.to}</Value>
            <Label>Cc :</Label>
            <Value>{props.mail.cc}</Value>
            <Label>Objet :</Label>
            <Value>{props.mail.subject}</Value>
            <Label>Mail :</Label>
            <Value>
                {props.mail.body.split('\n').map((line) => (
                    <p>{line}</p>
                ))}
            </Value>
        </>
    );
}

function computeMailto(mail: mailType) {
    return `mailto:${mail.to}?subject=${encodeURIComponent(mail.subject)}&cc=${
        mail.cc
    }&body=${encodeURIComponent(mail.body)}`;
}

const Label = styled(Typography)({
    display: 'flex',
    fontWeight: 'bold',
    alignItems: 'start',
    flex: 1,
});
const Value = styled(Typography)({ flex: 1 });

export { Mail };
export type { mailType };

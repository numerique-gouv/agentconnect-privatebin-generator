import { styled, Typography } from '@mui/material';

type mailType = {
    to: string;
    cc: string;
    subject: string;
    body: string;
};

function Mail(props: { mail: mailType }) {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Label>Destinataire :</Label>
                        </td>
                        <td>
                            <Value>{props.mail.to}</Value>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Label>Cc :</Label>
                        </td>
                        <td>
                            <Value>{props.mail.cc}</Value>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Label>Objet :</Label>
                        </td>
                        <td>
                            <Value>{props.mail.subject}</Value>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label>Mail :</Label>
                        </td>
                        <td>
                            <Value>{props.mail.body}</Value>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
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

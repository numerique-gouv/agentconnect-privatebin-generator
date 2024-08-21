import { useState } from 'react';
import { Button, styled } from '@mui/material';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { TextInput } from '../../components/TextInput';
import { privateBinApi } from '../../lib/privateBinApi';
import { Mail, mailType } from './Mail';

function Home() {
    const [spName, setSpName] = useState('FS');
    const [email, setEmail] = useState('email');
    const [clientId, setClientId] = useState('clientid');
    const [clientSecret, setClientSecret] = useState('clientsecet');

    const mutation = useMutation<{ url: string; password: string }, DefaultError, { text: string }>(
        { mutationFn: privateBinApi.create },
    );

    const mail = createMail({
        email,
        url: mutation.data?.url,
        password: mutation.data?.password,
        spName,
    });
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    label="Nom du Fournisseur de Service"
                    setText={setSpName}
                    text={spName}
                />
                <TextInput label="Email du destinataire :" setText={setEmail} text={email} />
                <TextInput label="Client ID" setText={setClientId} text={clientId} />
                <TextInput label="Client secret" setText={setClientSecret} text={clientSecret} />
                <Button type="submit">Générer le Privatebin</Button>
            </Form>
            {mutation.isPending && 'LOADING...'}
            {!!mail && !mutation.isPending && <Mail mail={mail} />}
        </>
    );

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const textToStore = computeTextToStore();
        mutation.mutate({ text: textToStore });
    }

    function createMail(params: {
        email: string;
        url?: string;
        password?: string;
        spName: string;
    }): mailType | undefined {
        if (!params.url || !params.password) {
            return undefined;
        }
        const body = `Bonjour,
        Vous trouverez vos identifiants pour le Fournisseur de Service "${params.spName}" à l'adresse suivante : ${params.url}\n
        
        Le mot de passe pour y accéder est le suivant : ${params.password}\n
        
        Veuillez notez que le lien expirera dans 7 jours à compter de cette date.\n

        Bien cordialement,\n

        L'équipe AgentConnect
        `;
        return {
            body,
            cc: 'support.partenaires@agentconnect.gouv.fr',
            to: params.email,
            subject: `Identifiants Fournisseur de Service AgentConnect - ${params.spName}`,
        };
    }

    function computeTextToStore() {
        const textToStore = `# Credentials du Fournisseur de Service "${spName}"
      ## CLIENT ID
      ${clientId}

      ## CLIENT SECRET
      ${clientSecret}
      `;
        return textToStore;
    }
}

const Form = styled('form')({ display: 'flex', flexDirection: 'column' });

export { Home };

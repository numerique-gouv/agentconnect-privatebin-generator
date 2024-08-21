import { TextField } from '@mui/material';

function TextInput(props: {
    text: string;
    setText: (text: string) => void;
    type?: string;
    label: string;
}) {
    return (
        <TextField
            label={props.label}
            name={props.label}
            type={props.type}
            onChange={onChange}
            value={props.text}
        />
    );

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.setText(event.target.value);
    }
}

export { TextInput };

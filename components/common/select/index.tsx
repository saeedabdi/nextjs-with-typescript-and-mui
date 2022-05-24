import { Control, useController, useForm } from 'react-hook-form';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MUISelect from '@mui/material/Select';

interface SelectProps extends Omit<React.ComponentProps<typeof MUISelect>, 'input'> {
    label: string;
    name: string;
    options: {
        value: string;
        label: string;
        icon?: React.ReactElement;
    }[];
    control?: Control<any>;
    wrapperSx?: SxProps<Theme>;
    helperText?: string;
}

function Select({
    label,
    name,
    options,
    wrapperSx,
    helperText,
    error,
    control,
    ...otherProps
}: SelectProps) {
    const { control: defaultControl } = useForm();

    const { field } = useController({
        control: control ? control : defaultControl,
        name,
        defaultValue: otherProps.defaultValue,
    });
    return (
        <FormControl sx={wrapperSx}>
            <InputLabel
                color={otherProps.color}
                error={!!helperText}
                id="demo-simple-select-helper-label"
            >
                {label}
            </InputLabel>
            <MUISelect
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '56px',
                }}
                label={label}
                SelectDisplayProps={{
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: '0px 8px',
                    },
                }}
                error={!!helperText}
                onChange={(e) => {
                    field.onChange(e.target.value);
                }}
                value={field.value}
                {...otherProps}
            >
                {options.map(({ value, label, icon }) => (
                    <MenuItem
                        sx={{
                            gap: '8px',
                            display: 'flex',
                        }}
                        key={value}
                        value={value}
                    >
                        {icon && <Box>{icon}</Box>}
                        <Typography>{label}</Typography>
                    </MenuItem>
                ))}
            </MUISelect>
            {helperText && (
                <FormHelperText>
                    <Typography fontSize={12} color={error ? 'error' : 'primary'}>
                        {helperText}
                    </Typography>
                </FormHelperText>
            )}
        </FormControl>
    );
}

export default Select;

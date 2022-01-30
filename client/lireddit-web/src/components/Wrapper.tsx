import { Box } from '@chakra-ui/react';
import React from 'react'

interface WrapperProps {
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant='regular'}) => {
    return (
        <Box maxW="800px" w="50%" mt={8} mx="auto">
            {children}
        </Box>
    );
}
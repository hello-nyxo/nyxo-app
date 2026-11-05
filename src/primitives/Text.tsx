import styled from 'styled-components/native';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export const Text = ({children}: Props) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text``;

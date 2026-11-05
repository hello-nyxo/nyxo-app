import React from 'react';
import styled from 'styled-components/native';

type Props = {
  title: string;
};

export const SectionTitle = ({title}: Props) => {
  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
};

const Container = styled.View`
  padding: 8px;
  background-color: #f4f4f4;
`;

const Text = styled.Text``;

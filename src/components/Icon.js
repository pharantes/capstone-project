import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
`;

export default function Icon({ onToggleFavorite, id }) {
    const [isFavorite, setFavorite] = useState(false)

    function handleToggleFavorite() {
        setFavorite(!isFavorite)
        onToggleFavorite(id)
    }

    return (
        <StyledButton onClick={() => handleToggleFavorite()}>
            <Image
                src={isFavorite ? "/favorite.svg" : "/not-favorite.svg"}
                width={32}
                height={32}
                alt="favorite icon"
            />
        </StyledButton>
    );
}
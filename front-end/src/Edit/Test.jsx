import React, { useState } from 'react';
import styled from "styled-components";
import EditModal from "./EditModal";
import AlertDismissible from "./AlertDismissible";

function Test(){

    return(
        <div>
            <p>asdf</p>
            <AlertDismissible>
                this is my message
            </AlertDismissible>
        </div>
        
    );
}

export default Test;
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

export const CustomInput = () => {
	const  { handleSubmit } = useMessageInputContext();

	return (
		<div className="str-chat__input-flat str-chat__input-flat--send-button-active">
			<div className="str-chat__input-flat-wrapper">
				<div className="str-chat__input-flat--textarea-wrapper">
					<ChatAutoComplete />
				</div>
				<button onClick={handleSubmit}>Enviar mensaje</button>
			</div>
		</div>
	);
}
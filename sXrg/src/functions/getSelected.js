const getSelected = (item, state, attribute) => {
	const found = state.find((element) => element.id === attribute.id);
	if (found)
		if (found.attribs.id === item.id) return "selected";
		else return "";
};

export default getSelected;

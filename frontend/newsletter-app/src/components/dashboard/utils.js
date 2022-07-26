const defaultPath = 'http://127.0.0.1:3001/api/v1/';

export const getAnalytics = async () => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}anlaytics`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));

		} catch(err) {
			console.log('*********** err  ', err);
			reject();
		}
    });
}

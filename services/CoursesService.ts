import axios from "axios";

const _apiURL: string = 'https://logiclike.com/docs/courses.json';

const CoursesService = {
    getInfo: async (): Promise<[]> => {
        try {
            const response = await axios.get(_apiURL);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
};

export default CoursesService;
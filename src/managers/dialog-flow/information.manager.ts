import { BrowseCarousel, Image, BrowseCarouselItem} from "actions-on-google";


export class InformationDFManager {

    constructor() {
    }

    public static generateOfficesSimpleResponse(offices) {
        let response = "Tienes " + offices.length + " oficinas cercanas a tu posición. ";
        offices.forEach((office) => {
                response = response + office.name + " en " + office.address + ", ";
        });
        response = response + "¿Cúal quieres seleccionar?";
        return response;
    }

    public static generateOfficesBrowseCarousel(offices) {
        const tmp =  {
            items: []
        };
        offices.forEach((office) => {
            const mapUrl = `https://maps.google.com/?q=${office.point.lat},${office.point.lng}`;
            tmp.items.push( new BrowseCarouselItem(
                {
                    title: office.name,
                    url: mapUrl,
                    description: office.address,
                    // image: new Image ({
                    //     url: office.image,
                    //     alt: office.name
                    // })
                })
            );
        });
        return (new BrowseCarousel(tmp));
    }
}
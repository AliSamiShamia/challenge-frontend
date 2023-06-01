interface OptionInterface {
    id: string,
    title: string,
    date: string,
    section_name: string,
    source: string,
    image: any | null
    web_url: string,
}
interface CategoryInterface {
    id: string,
    title: string,

}
interface ItemInterface {
    title: string,
    options: OptionInterface[] | CategoryInterface[],
    setFilterOption(key: string, value: any): void,
    key_name: string
}
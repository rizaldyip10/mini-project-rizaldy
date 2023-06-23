import { Flex, ListItem, UnorderedList } from "@chakra-ui/react"


const Paginate = ({postPerPage, totalPost, paginate}) => {
    const pageNumber = []

    for(let i = 0; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i)
    }

    

    return (
        <Flex>
            <UnorderedList>
                {pageNumber?.map((number) => {
                    <ListItem key={number} onClick={() => paginate(number)} className="page-number">
                        {number}
                    </ListItem>
                })}
            </UnorderedList>
        </Flex>
    )
}

export default Paginate
export const getUserRepo = (name: string, counter: number) => {
  return `query myRepo {
    user(login:"${name}"){
      repositories(first:${counter}){
    totalCount
        nodes{
         name
          updatedAt
          url
          pushedAt
          stargazerCount
          id
          owner{
            login
          }
        }  
      }
    }
    }`;
};

export const searchRepo = (name: string) => {
  return `query searchRepo {
        search(query:"${name}", type:REPOSITORY, first:100){
          nodes{
            ...on Repository{
              name
              updatedAt
              url
              pushedAt
             stargazerCount
             id
              owner{
                login
              }
            }
          }
        }
        }`;
};

export const currentRepo = (id: string) => {
  return `query currentRepo {
        node(id:"${id}"){
         ...on Repository{
           name
           updatedAt
           url
           pushedAt
           stargazerCount
           owner{
            avatarUrl
             login
             url
            }
           languages(first:15){
             nodes{
               name
               color
             }
           }
           description
         }
       }
         }`;
};

import { RouterModule, Routes } from "@angular/router";
import { ArticleCreateComponent } from "./article-create/article-create.component";
import { ArticleDetailsComponent } from "./article-details/article-details.component";
import { ArticlesListComponent } from "./articles-list/articles-list.component";

const routes: Routes = [
    {
        path: '',
        component:ArticlesListComponent,
        data: {
            title: "Articles"
        }
    },
    {
        path: 'create',
        component:ArticleCreateComponent,
        data: {
            title: "Create"
        }
    },
    {
        path: ':id',
        component:ArticleDetailsComponent,
        data: {
            title: "Details"
        }
    }
];

export const ArticleRoutingModule = RouterModule.forChild(routes);
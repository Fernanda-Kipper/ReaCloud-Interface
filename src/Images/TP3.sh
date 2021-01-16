# 1
#!/bin/bash
if [ -f $1 ]; then
        echo "É arquivo"
elif [ -d $1 ]; then
        echo  "É diretório"
else
        echo "Não é nenhum dos dois"
fi
echo "Fim do programa"

#2
#!/bin/bash
fahrenheit=$(($1*9+160/5))
echo "Valor em fahrenheit é: $fahrenheit"
echo "Fim do programa"

#3
#!/bin/bash
valor=$1
if [ $1 -le 0 ]; then
	echo "Insira um número inteiro e positivo"
else
	while [ $valor -gt 1 ]
	do
		valor=$((valor - 1))
		echo $valor
	done
fi
echo "Fim do programa"

#4
#!/bin/bash
echo "Digite o nome do arquivo"
read arq
if [ -e $arq ]; then
	echo "O arquivo existe"
else
	echo "Não existe"
fi
echo "Fim do programa"

#5
#!/bin/bash
echo "Digite o nome do arquivo:" 
read arq
if [ -e $arq ]; then
	echo "Existe"
	result=`stat -c %s $arq`
	if [ $result -gt 100 ]; then
		echo "Tem mais de 100 bytes"
	else
		echo "Não tem mais de 100 bytes"
	fi
else
	echo "Arquivo não existe"
fi
echo "Fim do programa"

#6
#!/bin/bash 
echo "Digite o mes: "
read mes
echo "Digite o ano: "
read ano
cal $mes $ano
echo "Fim do programa"

#7
#!/bin/bash
echo "Digite um número menor que 100 ou maior que 200"
read num
until [ $num -gt 200 -o $num -lt 100 ]
do
	echo "Digite um número válido: "
	read num
done
echo "Fim do programa"

#8
#!/bin/bash
echo "Digite um número menor que 100 ou maior que 200"
read num
while [ $num -ge 100 -a $num -le 200 ]
do
	echo "Digite um número válido: "
	read num
done
echo "Fim do programa"

#9
#!/bin/bash
echo "Digite a concentração do gás: "
read c
while [ $c -lt 0 -o $c -gt 99 ]
do
	echo "Digite um número válido: "
	read num
done
# obs: considerei extremo como >= 90 pois não especificava na tabela do ex
case $c in
	[0-1][0-9]) echo "Baixo";;
	[0-5][0-9]) echo "Moderado";;
	[0-8][0-9]) echo "Alto";;
	[0-9][0-9]) echo "Extremo";;
esac
echo "Fim do programa"

# 10
#!/bin/bash
echo "Digite a concentração do gás: "
read c
while [ $c -lt 0 -o $c -gt 99 ]
do
	echo "Digite uma concentração válida: "
	read c
done
# considerei extremo como >= 90
if [ $c -lt 20 ]; then
	echo "Baixo"
elif [ $c -ge 20 -a $c -lt 60 ]; then
	echo "Moderado"
elif [ $c -ge 60 -a $c -lt 90 ]; then
	echo "Alto"
else
	echo "Extremo"
fi
echo "Fim do programa"


